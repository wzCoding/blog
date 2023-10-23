const waves = [
    {
        wavePeriod: 2,
        waveHeight: 30,
        wavexCoord: 0,
        waveyCoord: 500,
        wavexMove: 0,
        horizontalSpeed: 0.08,
        waveColor: "#69c0ff"
    },
    {
        wavePeriod: 2,
        waveHeight: 40,
        wavexCoord: 0,
        waveyCoord: 520,
        wavexMove: 0,
        horizontalSpeed: 0.1,
        verticalSpeed: 0.05,
        waveColor: "#409eff",
    },
    {
        wavePeriod: 2,
        waveHeight: 35,
        wavexCoord: 0,
        waveyCoord: 600,
        wavexMove: 0,
        horizontalSpeed: 0.15,
        waveColor: "#093da8"
    }
];
const clouds = [
    {
        xCoordRatio: 0.1,
        yCoord: 200,
        radius: 30,
        speed: -2
    },
    {
        xCoordRatio: 0.3,
        yCoord: 250,
        radius: 30,
        speed: -2
    },
    {
        xCoordRatio: 0.5,
        yCoord: 170,
        radius: 40,
        speed: -2
    },
    {
        xCoordRatio: 0.7,
        yCoord: 300,
        radius: 60,
        speed: -2
    },
    {
        xCoordRatio: 0.9,
        yCoord: 280,
        radius: 50,
        speed: -2
    }
]
const sun = {
    xCoord: 100,
    yCoord: 150,
    radius: 30
}

export {
    waves,
    clouds,
    sun
}