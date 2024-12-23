<script>

export default{
    name: 'Diet',

}
</script>

<template>
    <div class="container">
        <h1>Alimentazione</h1>
        <div>
            <RouterLink :to="{name: 'Cookbook'}">
                <h2>Ricettario</h2>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>