import { useDrag } from "react-dnd";

export function MaterialItem(props: { name: string, type: string}) {

    const [_, drag] = useDrag({
        type: props.type,
        item: {
            type: props.type
        }    
    });

    return <div className="meterial-item" ref={drag}>{props.name}</div>;
}