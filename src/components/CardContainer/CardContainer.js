import React from 'react'
import Card from "../Card/Card"
import UniqueRandomArray from "unique-random-array"

const fetchUrl = 'http://localhost:3000/dogs/'

class CardContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dogs: []
        }
    }

    componentDidMount() {
        this.getDogs()
    }

    getDogs = () => {
        fetch(fetchUrl, {
            method: 'get'
        })
            .then(data => data.json())
            .then(res => {
                if (res.success) {
                    return res.data
                } else {
                    return res.message
                }
            })
            .then(res => {
                let random = UniqueRandomArray(res)
                let dogs = [random(), random()]
                const state = {...this.state, dogs: dogs, randomDog: random}
                this.setState(state)
                }
            )
    }

    clickUpdateWin = (id) => {
        fetch(fetchUrl + id + "/wins", {
            method: 'POST'
        })
    }

    refreshDogs = () => {
        let dogs = [this.state.randomDog(), this.state.randomDog()]
        while ((dogs[0]._id == this.state.dogs[0]._id || dogs[0]._id == this.state.dogs[1]._id)
            && (dogs[1]._id == this.state.dogs[0]._id || dogs[1]._id == this.state.dogs[1]._id)) {
            dogs = [this.state.randomDog(), this.state.randomDog()]
        }
        const state = {...this.state, dogs: dogs}
        this.setState(state)
    }

    render() {
        return (
            <div className="card-container">
                {
                    this.state.dogs.map(dog => {
                        return <Card
                            key={dog.id}
                            name={dog.name}
                            height={dog.height.metric + "cm"}
                            temperament={dog.temperament}
                            id={dog._id}
                            clickEvent={(id)=>{
                                this.clickUpdateWin(id)
                                this.refreshDogs()}}/>
                    })
                }
            </div>
        )
    }
}

export default CardContainer
