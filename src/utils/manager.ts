import p5 from "p5"
import { Entity } from './entity'

class EntityManager {
    constructor(
        public store: []
    ) {
        this.store = store
    }
    
    public static createEntityManager(entities: []) {
        return new EntityManager(entities)
    }

    public updateIndexIDs() {
        this.store.forEach((entity: Entity, index: number) => {
            entity.id = index
        })
    }

    public calcEntitiesForce() {
        let pairings: Object[] = []
        this.store.forEach((entity: Entity) => {
            this.store.forEach((entity2: Entity) => {
                if (entity.id !== entity2.id) {
                    let key = JSON.stringify([entity.id, entity2.id])
                    let mag = (entity.mass * entity2.mass) / (p5.Vector.sub(entity.position, entity2.position).magSq())
                    pairings.push({
                        key: mag
                    })
                }
            })
        })
        return pairings
    }
}