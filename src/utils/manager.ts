import p5 from "p5"
import { Entity } from './entity'
import { drawArrow } from "./arrow"

export class EntityManager {
    constructor(
        public p: p5,
        public store: Entity[] = [],
        public pairKey1: number[] = [],
        public pairKey2: number[] = [],
        public result: p5.Vector[] = []
    ) {}
    
    public static createEntityManager(p: p5, entities: [] = []) {
        return new EntityManager(p, entities)
    }

    public updateIndexIDs() {
        this.store.forEach((entity: Entity, index: number) => {
            entity.id = index
        })
    }

    public calcEntitiesForce() {
        this.pairKey1 = []
        this.pairKey2 = []
        this.result = []
        this.store.forEach((entity1: Entity) => {
            this.store.forEach((entity2: Entity) => {
                if (entity1.id !== entity2.id) {
                    this.pairKey1.push(entity1.id)
                    this.pairKey2.push(entity2.id)
                    let vec = this.p.createVector(0, 0)
                        .setMag((entity1.mass * entity2.mass) / (p5.Vector.sub(entity1.position, entity2.position).magSq()))
                        .setHeading(p5.Vector.sub(entity1.position, entity2.position).heading())
                    this.result.push(vec)
                }
            })
        })
        return this.result.length
    }
    
    public drawEntitiesForce() {
        this.result.forEach((force: p5.Vector, index: number) => {
            drawArrow(this.p, this.store[this.pairKey1[index]].position, force, this.p.color(0, 0, 0), 1000)
        })
    }

    public updateEntitiesAcceleration() {

    }
}