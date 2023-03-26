<script setup lang="ts">
import GridLabel from '@/components/GridLabel.vue'
import StatusLed from '@/components/StatusLed.vue'
import { reactive, computed } from 'vue'

/*
Cleanup notes:
1. Factor out incidence matrix generation, label management, and cell generation
    - Cell generation being the process of preparing components for rendering, taking
      the matrix as input.
2. Make the whole thing look nicer.
3. Maybe write up a way to hook up events to other components?
4. Make each cell consist of an LED *and* a 2-digit numeric display.
*/

const labels = [
  {
    component: GridLabel,
    props: {
      value: '',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'aaa',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'bbbbbbbb',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'cccc',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'ddddddd',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'ffffff',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'gggggggggggg',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'hhhh',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'iiiii',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'jjjj',
      tilt: true
    }
  },
  {
    component: GridLabel,
    props: {
      value: 'kkkk',
      tilt: true
    }
  }
]

const cells = reactive<boolean[][]>([
  [true, false, true, false, true, true, true, false, true, false],
  [true, false, false, false, true, false, true, false, true, true],
  [true, false, true, false, true, false, false, false, true, true],
  [true, false, false, false, true, true, true, false, true, false],
  [false, false, true, false, false, false, false, false, true, true],
  [true, false, true, false, true, false, true, false, true, false],
  [true, false, false, true, true, false, true, false, true, true],
  [true, false, true, false, true, false, true, false, true, false],
  [false, false, true, false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true, false, true, false]
])
const width = computed(() => cells.length)
const height = computed(() => cells[0].length)

const makeLedComponent = (value: boolean) => {
  return {
    component: StatusLed,
    props: {
      on: value
    }
  }
}

const withLabels = computed(() => {
  const allCells = []
  for (let row = 0; row < cells.length; row++) {
    allCells.push({
      component: GridLabel,
      props: {
        value: labels.slice(1)[row].props.value,
        tilt: false
      }
    })

    for (let col = 0; col < cells[row].length; col++) {
      const cell = cells[row][col]
      allCells.push(makeLedComponent(cell))
    }
  }
  console.log(allCells)
  return allCells
})
</script>

<template>
  <div class="wrapper" style="margin-top: 5rem">
    <component
      v-for="(label, lidx) in labels"
      :key="`label${lidx}`"
      :is="label.component"
      v-bind="label.props"
    />
    <component
      v-for="(cell, cidx) in withLabels"
      :is="cell.component"
      :key="`cell${cidx}`"
      v-bind="cell.props"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: max-content repeat(v-bind('width'), 30px);
  grid-template-rows: max-content repeat(v-bind('height'), 30px);
  gap: 10px;
}

.led {
  width: 15px;
  height: 15px;
  outline: 1px inset var(--alx-black);
  border-radius: 50%;
  background-color: var(--alx-bg-lighter);
}

.on {
  background-color: red;
}

.canted-label {
  width: fit-content;
  transform-origin: bottom left;
  transform: rotate(-35deg);
}
</style>
