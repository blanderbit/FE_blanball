<template>
    <div>
        <div v-for="item of routes">
            <button>
                {{item.name}} - {{item.path}}
            </button>
        </div>
    </div>
</template>

<script setup>
import routerConfig from '../../router/index'
const routes = routerConfig.options.routes
</script>

