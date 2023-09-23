const fs = require("fs")

const cars = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../data/cars.json`
    )
)

const getAllData = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            cars,
        },
    })
}

const getDataById = (req, res) => {
    const id = req.params.id
    const car = cars.find((el) => el.id === id)

    if (!car) {
        return res.status(404).json({
            status: "failed",
            message: `not found data with id ${id}`,
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            car,
        },
    })
}

const createData = (req, res) => {
    const newId = cars[cars.length - 1].id + 1
    const newData = Object.assign(
        { id: newId },
        req.body
    )

    cars.push(newData)
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    cars: newData,
                },
            })
        }
    )
}

const editData = (req, res) => {
    const id = req.params.id
    const carsIndex = cars.findIndex(
        (el) => el.id === id
    )

    if (carsIndex === -1) {
        return res.status(404).json({
            status: "failed",
            message: `not found data with id ${id}`,
        })
    }

    cars[carsIndex] = {
        ...cars[carsIndex],
        ...req.body,
    }

    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: "success",
                message: `success edit data`,
                data: {
                    car: cars[carsIndex],
                },
            })
        }
    )
}

const deleteData = (req, res) => {
    const id = req.params.id
    const carIndex = tours.findIndex(
        (el) => el.id === id
    )
    if (carIndex === -1) {
        return res.status(404).json({
            status: "failed",
            message: "data not found",
        })
    }
    tours.splice(carIndex, 1)
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(200).json({
                status: "success",
                message: "success delete data",
                data: null,
            })
        }
    )
}
module.exports = {
    getAllData,
    getDataById,
    createData,
    editData,
    deleteData,
}
