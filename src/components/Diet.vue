<script>

export default{
    name: 'Diet',

}
</script>

<template>
    <div class="container">
        <h1>Alimentazione</h1>
        <div class="list-diet">
            <RouterLink :to="{name: 'Cookbook'}">
                <h2>Ricettario</h2>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.list-diet{
    background: linear-gradient(135deg, #f5a962, #ea9f25, #d36b44);
    border-radius: 10px;
    text-align: center;
    padding: 25px 10px;

    a{
        text-decoration: none;
        color: #000000;
    }
}

</style>