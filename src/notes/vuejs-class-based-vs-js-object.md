---
layout: layouts/note.njk
title: Vue.js class-based vs. JS object
description:
date: 2019-07-04
tags:
  - vue
  - typescript
twitterId:
---
## Vue.js class-based and JS object by comparison

- typescript class that extends the Vue object
- officially maintained
- vuejs organizaion on Github owns `vue-class-component`

### skeleton

**class-based**

```
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue { ... }
</script>
```

**old-way**

```
<script>
export default { ... }
</script>
```

### Component Name

**class-based**

```
export default class HelloWorld extends Vue { ... }
```

**old-way**

```
export default {
  name: 'HelloWorld'
}
```

### Data Properties

**class-based**

*member variables of a class*

```
export default class HelloWorld extends Vue {
  isOpen: boolean = true
}
```

**old-way**

```
export default {
  data() {
    return {
      isOpen: true
    }
  }
}
```

### Lifecycle Hooks

**class-based**

*member functions of a class*

```
export default class HelloWorld extends Vue {
  mounted() {
    this.isOpen = false
  }
}
```

**old-way**

```
export default {
  mounted() {
    this.isOpen = false
  }
}
```

### Computed Properties

**class-based**

*member functions of a class, needs a `get` accessor*

```
export default class HelloWorld extends Vue {
  get allowClose(): boolean {
    return this.isOpen
  }
}
```

**old-way**

```
export default {
  computed: {
    allowClose() {
      return this.isOpen
    }
  }
}
```

### Methods

**class-based**

*member functions of a class*

```
export default class HelloWorld extends Vue {
  updateIsOpen(event) {
    this.isOpen = event.target.value
  }
}
```

**old-way**

```
export default {
  methods: {
    updateIsOpen(event) {
      this.isOpen = event.target.value
    }
  }
}
```

### Watch

**class-based**

```
import { Watch, Vue } from 'vue-property-decorator'

export default class HelloWorld extends Vue {
  // @Watch(propertyString, config)
  @Watch('isOpen')
  onPropertyChanged (value: string, oldValue: string) {
    this.redraw()
  }
}
```

**old-way**

```
export default {
  watch: {
    isOpen() {
      this.redraw()
    }
  }
}
```

### Props

**class-based**

```
import { Prop, Vue } from 'vue-property-decorator'

export default class HelloWorld extends Vue {
  // @Prop(config} name: type
  @Prop({ default: true }) isOpen!: boolean
}
```

**old-way**

```
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  }
}
```

### Include Components

**class-based**

```
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue { .. }
```

**old-way**

```
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  }
}
```
