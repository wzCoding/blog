const waves = [
    {
        wavePeriod: 2,
        waveHeight: 30,
        wavexCoord: 0,
        waveyCoord: 500,
        wavexMove: 0,
        horizontalSpeed: 0.08,
        waveColor: "#093da8"
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
        waveColor: "#69c0ff"
    }
];
const clouds = [
    {
        xCoordRatio: 0.1,
        yCoord: 230,
        radius: 30,
        speed: -2
    },
    {
        xCoordRatio: 0.3,
        yCoord: 280,
        radius: 30,
        speed: -2
    },
    {
        xCoordRatio: 0.5,
        yCoord: 200,
        radius: 40,
        speed: -2
    },
    {
        xCoordRatio: 0.7,
        yCoord: 330,
        radius: 60,
        speed: -2
    },
    {
        xCoordRatio: 0.9,
        yCoord: 310,
        radius: 50,
        speed: -2
    }
]
const sun = {
    xCoord: 100,
    yCoord: 180,
    radius: 30
}

export {
    waves,
    clouds,
    sun
}