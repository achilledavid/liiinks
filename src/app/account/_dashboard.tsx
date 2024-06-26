"use client";

import Header from "@/components/header/header";
import React, { Fragment, ReactNode, useState } from "react";
import style from "./account.module.scss";
import { Button } from "@/components/ui/button";
import Profile from "./_my-informations";
import Links from "./_my-links";
import MySpace from "./_my-space";
import { UsersType } from "@/lib/db/userHelper";
import { LinksType } from "@/lib/db/linksHelper";
import AccountMenu from "@/components/menu/account";

type Steps = {
    [key: string]: ReactNode;
}

type ButtonLabels = {
    [key: string]: string;
}

type StepsType<T extends Steps> = keyof T;


export default function Dashboard({ user }: {
    user: UsersType[0] & {
        link: Omit<LinksType[0], 'personalizedLinks'> & {
            personalizedLinks: Array<{ url: string, label: string }>
        }
    }
}) {
    const [step, setStep] = useState<StepsType<typeof steps>>("profile");

    const handleStepChange = (newStep: StepsType<typeof steps>) => {
        setStep(newStep);
    };

    const steps = {
        "profile": <Profile user={user} />,
        "links": <Links link={user.link} />,
        "my-space": <MySpace />,
    };

    const buttonLabels: ButtonLabels = {
        "profile": "Mes informations",
        "links": "Mes liens",
        "my-space": "Mon espace",
    };

    return (
        <Fragment>
            <Header menu={<AccountMenu />} />
            <main className={style.container}>
                <div className={style.content}>
                    <div className={style.menu}>
                        {Object.keys(steps).map((key) => (
                            <Button
                                key={key}
                                size="sm"
                                variant={step === key ? "secondary" : "link"}
                                onClick={() => handleStepChange(key as StepsType<typeof steps>)}
                            >{buttonLabels[key]}</Button>
                        ))}
                    </div>
                    {steps[step]}
                </div>
            </main>
        </Fragment>
    );
}
