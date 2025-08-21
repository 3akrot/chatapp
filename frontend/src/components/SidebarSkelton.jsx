import {Users} from "lucide-react";

export function SidebarSkelton() {

    return (
        <aside className={'h-full bg-base-200 w-20 lg:w-72 border-r border-base-300 flex flex-col tansition-all duration-300 '}>
            <div className={'w-full border-b-2 border-base-300 p-5 flex items-center justify-center lg:justify-start gap-2'}>
                <Users></Users>
                <span className={'font-medium hidden lg:block'}>Contacts</span>

            </div>
            <div className="overflow-y-auto w-full py-3">
                {Array.from({length:5}).map((e,i) => (
                    <button
                        key={i}
                   className={`
              w-full p-3 flex items-center gap-3
               transition-colors
              
            `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <div className={'skeleton size-12 rounded-full'}> </div>
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden  lg:block text-left min-w-0">
                            <div className="font-medium skeleton mb-3 h-4 w-32 truncate"></div>
                            <div className=" skeleton h-2 w-24 "></div>
                        </div>
                    </button>
                ))}

            </div>
        </aside>
    )
}
