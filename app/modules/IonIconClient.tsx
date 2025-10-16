import { useEffect, useState } from "react"


export default function IonIconClient(props: any) {
    const [Comp, setComp] = useState<any>(null)

    useEffect(() => {
        let mounted = true
        import("@reacticons/ionicons")
            .then((mod) => {
                // module might be the component itself or { default: component }
                const component = (mod && (mod.default || mod))
                if (mounted) setComp(() => component)
            })
            .catch(() => {
                // swallow - icon is optional UI
            })
        return () => { mounted = false }
    }, [])

    if (!Comp) return <span {...props} />
    return <Comp {...props} />
}