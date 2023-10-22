const waves = [
    {
        wavePeriod: 2 / window.devicePixelRatio,
        waveHeight: 30 / window.devicePixelRatio,
        wavexCoord: 0,
        waveyCoord: 400,
        wavexMove: 0,
        horizontalSpeed: 0.08,
        waveColor: "#69c0ff"
    },
    {
        wavePeriod: 2 / window.devicePixelRatio,
        waveHeight: 40 / window.devicePixelRatio,
        wavexCoord: 0,
        waveyCoord: 420,
        wavexMove: 0,
        horizontalSpeed: 0.1,
        verticalSpeed: 0.05,
        waveColor: "#409eff",
    },
    {
        wavePeriod: 2 / window.devicePixelRatio,
        waveHeight: 35 / window.devicePixelRatio,
        wavexCoord: 0,
        waveyCoord: 500,
        wavexMove: 0,
        horizontalSpeed: 0.15,
        waveColor: "#093da8"
    }
];
const clouds = [
    {
        xCoord: 100 / window.devicePixelRatio,
        yCoord: 200 / window.devicePixelRatio,
        radius: 30 / window.devicePixelRatio,
        speed: 2.5
    },
    {
        xCoord: 100 / window.devicePixelRatio,
        yCoord: 120 / window.devicePixelRatio,
        radius: 40 / window.devicePixelRatio,
        speed: 2
    },
    {
        xCoord: 100 / window.devicePixelRatio,
        yCoord: 240 / window.devicePixelRatio,
        radius: 60 / window.devicePixelRatio,
        speed: 1.5
    }
]
const sun = {
    xCoord: 100 / window.devicePixelRatio,
    yCoord: 100 / window.devicePixelRatio,
    radius: 30 / window.devicePixelRatio
}

export {
    waves,
    clouds,
    sun
}