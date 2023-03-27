import p5 from "p5"
import { Entity } from './entity'
import { drawArrow } from "./arrow"

export class EntityManager {
    constructor(
        public p: p5,
        public store: Entity[] = [],
        public pairKey1: number[] = [],
        public pairKey2: number[] = [],
        public result: p5.Vector[] = [],
        public G: number = 5
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

    public pairKeys(arr: any[], k: number, prefix: any[][] = []): any[][] {
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
        // Loop through each pair of entities
        pairs.forEach((pair: number[]) => {
            let entity1 = this.store[pair[0]]
            let entity2 = this.store[pair[1]]
            // f = m1 * m2 (* multiplier) / r^2
            // Calculate the force between each pair of entities
            let force = (this.G * entity1.mass * entity2.mass) / (entity1.position.dist(entity2.position) ** 2)
            let radian = this.p.atan2(entity1.position.y - entity2.position.y, entity1.position.x - entity2.position.x)
            let forceVec1 = p5.Vector.fromAngle(radian - this.p.PI, force)
            let forceVec2 = p5.Vector.fromAngle(radian , force)
            this.store[entity1.id].forces.push(forceVec1)
            this.store[entity2.id].forces.push(forceVec2)
        })
        // Loop through each entity to calculate the resultant force
        this.store.forEach((entity: Entity) => {
            entity.update()
        })
    }

    public update() {
        this.updateIndexIDs()
        this.clearEntitiesForce()
        this.updateEntitiesForce()
    }

    public updateEditing() {
        this.store.forEach(entity => {
            entity.updateEditing()
        })
    }

    public draw() {
        this.store.forEach((entity: Entity) => {
            entity.draw()
        })
    }
}