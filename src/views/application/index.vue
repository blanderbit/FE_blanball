<template>
    <div class="main-wrapper">
        <sidebar/>
        <div class="main-block">
            <div class="container">
                <main-header/>
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Sidebar from './../../components/Sidebar.vue'
    import MainHeader from './../../components/MainHeader.vue'
</script>

<style lang="scss">
    @import 'bootstrap/dist/css/bootstrap-grid.min.css';

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .main-wrapper {
        display: grid;
        grid-template-columns: 64px 1fr;
        height: 100vh;
        overflow: hidden;
        @media (max-width: 992px) {
            grid-template-columns: 1fr;
        }
        .main-block {
            height: 100%;
            overflow: scroll;
        }
    }
</style>


