import { useState } from "react"
import { config } from "../template-config"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Homepage() {
    return <>
        <Navbar />
        <Main />
        <Footer />
    </>
}

function Main() {
    const [heroInformation] = useState(config[`website-name`] ? {
        name: config['website-name'].value,
        nameColor: config['website-name'].color,
        statement: config['action-statement'].value,
        statementColor: config['action-statement'].color
    } : {
        name: 'Website Name',
        nameColor: 'black',
        statement: 'Action Statement',
        statementColor: 'black'
    })

    return (
        <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
                <span>
                    <header
                        className={`text-3xl leading-10 text-ui-fg-base font-normal ${heroInformation.nameColor}`}
                    >
                        {heroInformation.name}
                    </header>
                    <header
                        className={`text-3xl leading-10 text-ui-fg-subtle font-normal ${heroInformation.statementColor}`}
                    >
                        {heroInformation.statement}
                    </header>
                </span>
            </div>
        </div>
    )
}