import {v4 as UUID} from 'uuid';

export abstract class Entity<InitProps>{
    public readonly guid: string;

    constructor(guid?: string) {
        this.guid = guid || UUID();
    }


}