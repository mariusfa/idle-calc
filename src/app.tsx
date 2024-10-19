import { useComputed, useSignal } from "@preact/signals";

const calcValue = (desiredCredit: number): number => {
    let cBase = 10;
    let cNext = 30;
    let vBase = 10;
    let vNext = 100;
    let n = 1;

    if (desiredCredit < cBase) {
        return 0;
    }

    while (true) {
        if (desiredCredit >= cBase && desiredCredit < cNext) {
            break;
        }
        n += 1;
        const nNext = n + 1;
        vBase = vNext;
        vNext *= 10;
        cBase = cNext;
        cNext = (10 * nNext * (nNext + 1)) / 2;
    }

    console.log("n:", n);
    console.log("c:", desiredCredit);
    console.log("c_base:", cBase);
    console.log("c_next:", cNext);
    console.log("v_base:", vBase);
    console.log("v_next:", vNext);

    return (
        vBase + ((desiredCredit - cBase) * (vNext - vBase)) / (cNext - cBase)
    );
};

export function App() {
    const desiredCredit = useSignal(0);
    const calculatedValue = useComputed(() => calcValue(desiredCredit.value));

    return (
        <div>
            <h1>Idle calc</h1>
            <label for="desiredCredit">Enter desired base credits</label>
            <input
                name="desiredCredit"
                id="desiredCredit"
                type="number"
                value={desiredCredit}
                onChange={(event: Event) =>
                    (desiredCredit.value = parseFloat(
                        (event.target as HTMLInputElement).value,
                    ))
                }
            />
            <p>Calculated value in M: {calculatedValue}</p>
        </div>
    );
}
