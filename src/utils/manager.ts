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
    
    pairKeys(arr: any[], k: number, prefix: any[] = []): any[] {
        if (k == 0) return [prefix];
        return arr.flatMap((v, i) =>
            this.pairKeys(arr.slice(i + 1) as [], k - 1, [...prefix, v])
        );
    }

    public static createEntityManager(p: p5, entities: [] = []) {
        return new EntityManager(p, entities)
    }

    public updateIndexIDs() {
        this.store.forEach((entity: Entity, index: number) => {
            entity.id = index
        })
    }

    public calcEntitiesForce() {
        let entities = this.store.map((entity: Entity) => entity.id)
        console.log(this.pairKeys(entities, 2))

    }
    
    public drawEntitiesForce() {
        this.result.forEach((force: p5.Vector, index: number) => {
            drawArrow(this.p, this.store[this.pairKey1[index]].position, force, this.p.color(0, 0, 0), 1000)
        })
    }

    public updateEntitiesAcceleration() {

    }
}