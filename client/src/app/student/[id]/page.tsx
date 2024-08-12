import Resume from "@/components/sections/Resume"

const page = ({params  }:any) => {

    return (
        <div>
            <Resume slug={params.id} />
        </div>
    )
}

export default page
