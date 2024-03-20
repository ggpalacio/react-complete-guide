import { calculateInvestmentResults, formatter } from "../util/investment"

export default function TableResult({userInput}) {
    const result = calculateInvestmentResults(userInput)
    return (
        <>
            {result.length > 0 && (
                <table id="result">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Investment Value</th>
                            <th>Interest (Year)</th>
                            <th>Total Interest</th>
                            <th>Invested Capital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((data, index) => {
                            const investedCapital = userInput.initialInvestment + (data.annualInvestment * data.year)
                            const totalInterest = data.valueEndOfYear - investedCapital
                            return (    
                                <tr key={index}>
                                    <td>{data.year}</td>
                                    <td>{formatter.format(data.valueEndOfYear)}</td>
                                    <td>{formatter.format(data.interest)}</td>
                                    <td>{formatter.format(totalInterest)}</td>
                                    <td>{formatter.format(investedCapital)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </>
    )
}