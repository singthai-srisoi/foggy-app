<script>
    export let data = {}

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const random_bright_color = () => {
        
        const h = randomInt(0, 360);
        const s = randomInt(42, 98);
        const l = randomInt(40, 90);
        return `hsl(${h},${s}%,${l}%)`;
    }

    const random_dark_color = () => {
        const h = randomInt(0, 360);
        const s = randomInt(42, 98);
        const l = randomInt(40, 90);
        return `hsl(${h},${s}%,${l}%)`;
    }
</script>

<div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front" style="background-color: {random_bright_color()}; color: black;">
            <h1>{data['front']['title']}</h1>
            <p>{data['front']['content']}</p>
        </div>
        <div class="flip-card-back" style="background-color: {random_dark_color()}; color: white;">
            <h1>{data['back']['title']}</h1>
            <p>{data['back']['content']}</p>
        </div>
    </div>
</div>

<style>

.flip-card {
    background-color: transparent;
    width: 300px;
    height: 350px;
    /* border: 1px solid #f1f1f1; */
    perspective: 1000px;
    padding: 10px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.3s;
    transform-style: preserve-3d;
}


.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

/* .flip-card-front {
    background-color: #bbb;
    color: black;
} */

.flip-card-back {
    /* background-color: #2980b9;
    color: white; */
    transform: rotateY(180deg);
}

</style>