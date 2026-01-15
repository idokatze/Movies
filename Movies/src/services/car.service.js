import { storageService } from './async-storage.service.js'
import { makeId, loadFromStorage, saveToStorage } from './util.service.js'

const KEY = 'cars'
_createCars()

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
}

async function query(filterBy = {}) {
    var cars = await storageService.query(KEY)

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        cars = cars.filter(car => regex.test(car.vendor))
    }
    return cars
}

async function get(id) {
    return storageService.get(KEY, id)
}

async function remove(id) {
    return storageService.remove(KEY, id)
}

async function save(car) {
    if (car._id) return storageService.put(KEY, car)
    else return storageService.post(KEY, car)
}

function getEmptyCar() {
    return {
        vendor: '',
        speed: 0,
    }
}

function _createCars() {
    var cars = loadFromStorage(KEY)
    if (cars && cars.length) return

    cars = [
        _createCar('audi', 50),
        _createCar('fiat', 73),
        _createCar('honda', 100),
        _createCar('suzuki', 100),
    ]
    saveToStorage(KEY, cars)
}

function _createCar(vendor, speed) {
    return {
        _id: makeId(),
        vendor,
        speed,
    }
}
