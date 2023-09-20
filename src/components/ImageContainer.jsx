import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"


function ImageContainer({ data }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div className='rounded-md overflow-hidden' ref={setNodeRef} {...attributes} {...listeners} style={style} >
            <img src={data.src.portrait} alt={data.alt} />
            <h3 className='mt-1 px-1 font-medium'>{data.alt}</h3>
        </div>
    )
}

export default ImageContainer
