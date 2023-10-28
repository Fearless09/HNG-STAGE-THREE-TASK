import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Link } from 'react-router-dom'
import { GrFormNextLink } from 'react-icons/gr'
import { BsArrowRightShort } from 'react-icons/bs'

function ImageContainer({ data }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div className='rounded-md relative overflow-hidden' ref={setNodeRef} {...attributes} {...listeners} style={style} >
            <img src={data.src.portrait} alt={data.alt} />
            <div className="absolute w-full bottom-0 left-0 py-3 px-2 text-white bg-[rgba(0,0,0,0.30)]">
                <Link to={`/image-details/${data.id}`} className='font-medium hover:text-orange-200'>
                    {data.alt}
                    <span className="inline-flex ml-2 relative top-[6px]">
                        <BsArrowRightShort
                            size={22}
                        />
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default ImageContainer
