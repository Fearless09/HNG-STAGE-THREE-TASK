import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Link } from 'react-router-dom'

function ImageContainer({ data }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div className='rounded-md border pb-3 overflow-hidden' ref={setNodeRef} {...attributes} {...listeners} style={style} >
            <img src={data.src.portrait} alt={data.alt} />
            <Link to={`/image-details/${data.id}`}>
                <h3 className='mt-1 px-1 font-medium hover:text-blue-600'>{data.alt}</h3>
            </Link>
        </div>
    )
}

export default ImageContainer
