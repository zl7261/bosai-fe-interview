import {useCallback, useState} from 'react';


type Material = {
    name: string;
    quantity: number;
};

type Materials = {
    stones: Material;
    grass: Material;
    woods: Material;
};

interface MaterialsUpdateStrategy {
    updateMaterials(materials: Materials): Materials;
}

class MaterialsStore {
    private materials: Materials;

    constructor() {
        this.materials = {
            stones: {name: '石头', quantity: 10},
            grass: {name: '干草', quantity: 5},
            woods: {name: '木头', quantity: 10},
        };
    }

    getMaterials = (): Materials => {
        return this.materials;
    };

    update = (strategy: MaterialsUpdateStrategy): void => {
        this.materials = strategy.updateMaterials(this.materials);
    };
}

export class StoneStrategy implements MaterialsUpdateStrategy {
    updateMaterials(materials: Materials): Materials {
        return {
            ...materials,
            stones: {...materials.stones, quantity: materials.stones.quantity + 2},
        };
    }
}

export class GrassStrategy implements MaterialsUpdateStrategy {
    updateMaterials(materials: Materials): Materials {
        return {
            ...materials,
            grass: {...materials.grass, quantity: materials.grass.quantity + 3},
        };
    }
}

export class WoodStrategy implements MaterialsUpdateStrategy {
    updateMaterials(materials: Materials): Materials {
        return {
            ...materials,
            woods: {...materials.woods, quantity: materials.woods.quantity + 1},
        };
    }
}

export const useMaterialsStore = (): [Materials, (strategy: MaterialsUpdateStrategy) => void] => {
    const [materialsStore] = useState(() => new MaterialsStore());
    const [materials, setMaterials] = useState<Materials>(materialsStore.getMaterials());

    const updateMaterials = useCallback((strategy: MaterialsUpdateStrategy) => {
        materialsStore.update(strategy);
        setMaterials(materialsStore.getMaterials());
    }, [materialsStore]);

    return [materials, updateMaterials];
};