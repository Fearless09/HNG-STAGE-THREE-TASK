import React from 'react'

import ImageContainer from './ImageContainer'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable'

function Images({ data, setData }) {

    function onDragEnd(event) {
        const { active, over } = event
        if (active.id === over.id) {
            return
        }
        setData(datas => {
            const oldIndex = datas.findIndex(data => data.id === active.id)
            const newIndex = datas.findIndex(data => data.id === over.id)
            return arrayMove(datas, oldIndex, newIndex)
        })
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-14 gap-y-10 mt-5 px-3">
            {data.length == 0 ?
                <p className='text-xl font-semibold'>No Image Found</p>
                : <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} >
                    <SortableContext items={data} strategy={rectSortingStrategy} >
                        {data.map((data) => (
                            <ImageContainer key={data.id} data={data} />
                        ))}
                    </SortableContext>
                </DndContext>
            }
        </div>
    )
}

export default Images
