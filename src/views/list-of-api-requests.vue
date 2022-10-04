<template>
    <div>
        <div v-for="item in availableMethods">
            {{ item }}
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import { API }  from "../workers/api-worker/api.worker";

    export default {
        name: "list-of-api-requests",
        setup() {
            const availableMethods = ref(API.availableMethods);
            return {
                availableMethods
            }
        }
    }
</script>