<script>
export default{
    name: 'Footer'
}
</script>

<template>
    <div>
        <h5>ReM</h5>
        <h6>copyright &copy; 2025</h6>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

div {
    text-align: center;
    height: 50px;
    background-color: #000;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    overflow: hidden;
}

h5, h6 {
    font-family: 'Roboto', sans-serif;
    color: #fff;
    margin: 0;
    line-height: 1;
    letter-spacing: 1px;
}

h5 {
    font-size: 0.9rem;
    font-weight: 500;
}

h6 {
    font-size: 0.7rem;
    font-weight: 400;
    opacity: 0.8;
}
</style>
