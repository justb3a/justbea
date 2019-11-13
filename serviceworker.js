(() => {
  // Update 'version' if you need to refresh the cache
  const cacheVersion = 'v1.0.4';
  const baseUrl = 'https://justbea.dev';
  const offlinePage = '/offline/';
  const alwaysCache = [
    '/',
    offlinePage,
    `/assets/js/main.min.js`,
    `/assets/css/main.min.css`,
    '/assets/img/sprites.svg',
  ];
  const neverCache = ['/serviceworker.js', '/micropub/'];

  const offlineSvg = `
    <svg width="400" height="300" role="img" aria-labelledby="offline-title"
      viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <title id="offline-title">Offline</title>
      <g fill="none" fill-rule="evenodd">
        <path fill="#D8D8D8" d="M0 0h400v300H0z"/>
        <text fill="#9B9B9B" font-family="Arial, sans-serif" font-size="72" font-weight="bold">
          <tspan x="93" y="172">offline</tspan>
        </text>
      </g>
    </svg>`;

  const svgHeader = { headers: { 'Content-Type': 'image/svg+xml' } };

  const emptyResponse = new Response('', {
    status: 408,
    statusText: 'The server appears to be offline.',
  });

  // Store core files in a cache (including a page to display when offline)
  const updateStaticCache = () => {
    caches.open(cacheVersion).then(cache => {
      cache.addAll(alwaysCache);
    });
  };

  // Remove caches whose name is no longer valid
  const removeInvalidCache = () => {
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => {
            return !key.startsWith(cacheVersion);
          })
          .map(key => {
            return caches.delete(key);
          }),
      );
    });
  };

  const cacheAndReturnResponse = (response, event) => {
    event.waitUntil(
      caches.open(cacheVersion).then(cache => {
        return cache.put(request, response);
      }),
    );

    return response.clone();
  };

  const fetchNetwork = request => {
    return fetch(request).catch(() => {
      return caches.match(offlinePage);
    });
  };

  self.addEventListener('install', event => {
    event.waitUntil(updateStaticCache());
    self.skipWaiting();
  });

  self.addEventListener('activate', event => {
    event.waitUntil(removeInvalidCache());
    clients.claim();
  });

  self.addEventListener('fetch', event => {
    let request = event.request;

    // Always fetch non-GET requests from the network
    if (request.method !== 'GET') {
      event.respondWith(fetchNetwork(request));
    }

    // If we have a reqest, that matches in neverCache, always return from network
    if (neverCache.some(item => new RegExp(`\\b${item}\\b`).test(request.url.replace(baseUrl, '')))) {
      event.respondWith(fetchNetwork(request));
    }

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(request)
          .then(response => {
            cacheAndReturnResponse(response, event);
          })
          .catch(() => {
            return caches.match(request).then(cachedResponse => {
              return cachedResponse || caches.match(offlinePage);
            });
          }),
      );
    }

    // Static assets: Cache first, then network
    if (/\.css$/.test(request.url) || /\.js$/.test(request.url)) {
      event.respondWith(
        caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(request)
            .then(response => {
              cacheAndReturnResponse(response, event);
            })
            .catch(() => emptyResponse);
        }),
      );
    }

    // If the request is for an image, show an offline placeholder
    if (request.headers.get('Accept').indexOf('image') !== -1) {
      event.respondWith(
        caches.match(request).then(response => {
          if (response) {
            return response;
          }

          return new Response(offlineSvg, svgHeader);
        }),
      );
    }
  });
})();
