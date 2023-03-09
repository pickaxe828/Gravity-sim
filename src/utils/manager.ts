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
    
    /**
     * Constructor for `EntityManager`
     * @param p p5 instance
     * @param entities Array of initial entities
     * @returns `EntityManager` instance
     */
    public static createEntityManager(p: p5, entities: [] = []) {
        return new EntityManager(p, entities)
    }

    pairKeys(arr: any[], k: number, prefix: any[][] = []): any[][] {
        if (k == 0) return [prefix];
        return arr.flatMap((v, i) =>
            this.pairKeys(arr.slice(i + 1) as [], k - 1, [...prefix, v])
        );
    }

    public clearEntitiesForce() {
        this.store.forEach((entity: Entity) => {
            entity.forces = []
        })
    }

    public updateIndexIDs() {
        this.store.forEach((entity: Entity, index: number) => {
            entity.id = index
        })
    }

    public updateEntitiesForce() {
        let entities = this.store.map((entity: Entity) => entity.id)
        let pairs = this.pairKeys(entities, 2) as number[][]
        console.log(pairs)
        // Calculate the force between each pair of entities
        pairs.forEach((pair: number[]) => {
            let entity1 = this.store[pair[0]]
            let entity2 = this.store[pair[1]]
            // f = m1 * m2 (* multiplier) / r^2
            // G is replaced with multiplier
            let force = entity1.position.copy().mult(entity2.position).div(entity1.position.dist(entity2.position) ** 2)
            this.store[entity1.id].forces.push(force)
            this.store[entity2.id].forces.push(force)
        })
    }
    
    /** 
     * This method is for debugging. Draws all the pulling forces. 
     */
    public drawEntitiesForce() {
        this.result.forEach((force: p5.Vector, index: number) => {
            drawArrow(this.p, this.store[this.pairKey1[index]].position, force, this.p.color(0, 0, 0), 1000)
        })
    }

    public update() {
        this.updateIndexIDs()
        this.clearEntitiesForce()
        this.updateEntitiesForce()
    }

    public draw() {
        this.store.forEach((entity: Entity) => {
            entity.draw(this.p)
        })
    }
}