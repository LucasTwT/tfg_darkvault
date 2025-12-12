import { palette } from "./colors";

export const lightTheme = {
    dark: false,
    colors: {
        background: palette.neutral50,
        textTitle: palette.primary800,
        iconBackground: palette.neutral600,
        spinner: palette.primary800
    },
    form: {
        background: palette.primary900a2,
        opacity: .04,
        border: palette.primary800,
        shadow: palette.shadowForm
    },
    inputText: {
        labels: palette.neutral900,
        placeholders: palette.neutral600,
        ic: palette.neutral600,
        error: palette.error400 
    },

    buttons: {
        text: palette.primary800
    },

    icButtons: {
                background: palette.neutral500a,
                icColor: palette.neutral900,
                shadowColor: palette.neutral50
    },
    link: {
        text: palette.primary800,
        border: palette.primary800,
        shadow: palette.shadowLink
    },
    bottomTabBar: {
        background: palette.primary900,
        opacity: .09,
        buttons: {
            background: "#584767",
            opacity: .12,
            ic: palette.neutral900
        }
    },
    popOver: {
            background: palette.neutral50,
            itemBackgroundSelected: palette.neutral900a,
            borderColor: palette.ultraWhite,
            ic: palette.neutral900,
            text: palette.neutral900
        },
    grid: {
        textColor: palette.neutral900,
        element: {
            borderColor: palette.ultraWhite,
            icColor: palette.neutral900
        }
    },
    bottomActionSheet: {
        background: palette.neutral50,
        handleIndicatorColor: palette.neutral900,
        handleIndicatorText: palette.neutral900,
        icColor: palette.neutral900,
        actionName: palette.neutral900,
        description: palette.neutral600,
        borderBottom: palette.neutral300
    },

    customHandleComponent: {
        btnClose: {
            background: "rgba(131, 144, 250, .25)",
            icColor: "rgb(131, 144, 250)",
        },
        btnAction: {
            background: "rgb(131, 144, 250)",
            textColor: palette.neutral50
        }
    },

    itemGrid: {
        background: palette.neutral50,
        borderColor: palette.neutral900,
        icColor: palette.neutral800
    }
}

export const darkTheme = {
    dark: true,
    colors: {
        background: palette.darkmode500,
        textTitle: palette.primary100,
        iconBackground: palette.neutral500,
        spinner: palette.shadowLinkDarkmode
    },
    form: {
        background: palette.primary900a,
        opacity: .13,
        border: palette.primary800,
    },
    inputText: {
        labels: palette.neutral50,
        placeholders: palette.neutral300,
        ic: palette.neutral500,
        error: palette.error400 
    },

    buttons: {
        text: palette.primary200
    },
    icButtons: {
            background: palette.primary900a3,
            icColor: palette.primary100,
            shadowColor: palette.shadowIcButtonDarkmode
        },
    link: {
        text: palette.primary100,
        border: palette.primary600,
        shadow: palette.shadowLinkDarkmode
    },
    bottomTabBar: {
        background: palette.primary900,
        opacity: .09,
        buttons: {
            background: "#584767",
            opacity: .12,
            ic: palette.neutral500
        }
    },
    popOver: {
            background: palette.primary900a4,
            itemBackgroundSelected: palette.primary600a,
            borderColor: palette.neutral900,
            ic: palette.neutral50,
            text: palette.neutral50
        },

    grid: {
        background: palette.primary900a3,
        textColor: palette.neutral50,
        shadowColor: palette.shadowIcButtonDarkmode,
        element: {
            borderColor: palette.neutral900,
            icColor: palette.neutral500
        }
    },

    bottomActionSheet: {
        background: palette.darkmode300,
        handleIndicatorColor: palette.primary200,
        handleIndicatorText: palette.primary200,
        icColor: palette.neutral500,
        actionName: palette.neutral50,
        description: palette.neutral500,
        borderBottom: palette.primary200
    },

    customHandleComponent: {
        btnClose: {
            background: "rgba(131, 144, 250, .25)",
            icColor: "rgb(131, 144, 250)",
        },
        btnAction: {
            background: "rgb(131, 144, 250)",
            textColor: palette.darkmode500
        }
    },

    itemGrid: {
        background: palette.darkmode100,
        borderColor: palette.neutral50,
        icColor: palette.neutral200
    }
}