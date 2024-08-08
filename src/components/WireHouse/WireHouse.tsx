import './style.css'
import {GrassStrategy, StoneStrategy, useMaterialsStore, WoodStrategy} from "../../hooks/Material.ts";
import KeepClickButton from "../KeepClickButton/KeepClickButton.tsx";

const WireHouse = () => {
    const [materials, updateMaterials] = useMaterialsStore();

    const handleUpdateStones = () => {
        updateMaterials(new StoneStrategy());
    };

    const handleUpdateGrass = () => {
        updateMaterials(new GrassStrategy());
    };

    const handleUpdateWoods = () => {
        updateMaterials(new WoodStrategy());
    };


    return (
        <div className="storage">
            <div className="storageArea">
                <div>
                    <div>仓库</div>
                </div>
                <ul>
                    {Object.values(materials).map((item, i) => {
                            return (
                                <li className="resource" key={`name-${i}`}>
                                    <span className="resourceName">{item.name}</span>
                                    <span className="resourceNum">{item.quantity}</span>
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
            <div className="flex-center">
                <KeepClickButton
                    keep={1000}
                    onClick={handleUpdateWoods}
                >
                    <div className="desc">伐木+1</div>
                </KeepClickButton>
                <KeepClickButton
                    keep={1000}
                    onClick={handleUpdateStones}
                >
                    <div className="desc">挖石头+2</div>
                </KeepClickButton>
                <KeepClickButton
                    keep={1000}
                    onClick={handleUpdateGrass}
                >
                    <div className="desc">采集干草+3</div>
                </KeepClickButton>
            </div>
        </div>
    );
}

export default WireHouse;