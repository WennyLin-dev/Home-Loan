"use client"

import { useState, useEffect } from 'react'
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Button,Slider,Card,Box } from "@mui/material"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
// import { InfoIcon, PlusCircle } from 'lucide-react'

function AdvancedHomeLoanCalculatorComponent() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(5.79)
  const [loanTermYears, setLoanTermYears] = useState(30)
  const [loanTermMonths, setLoanTermMonths] = useState(0)
  const [monthlyRepayment, setMonthlyRepayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [adjustedRepayment, setAdjustedRepayment] = useState(0)
  const [adjustedTerm, setAdjustedTerm] = useState({ years: 0, months: 0 })
  const [potentialSavings, setPotentialSavings] = useState(0)

  const calculateLoan = () => {
    const principal = loanAmount
    const annualRate = interestRate / 100
    const monthlyRate = annualRate / 12
    const totalMonths = loanTermYears * 12 + loanTermMonths

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    const totalPaid = monthlyPayment * totalMonths
    const totalInterestPaid = totalPaid - principal

    setMonthlyRepayment(monthlyPayment)
    setTotalInterest(totalInterestPaid)
    setTotalCost(totalPaid)
    setAdjustedRepayment(monthlyPayment)
  }

  useEffect(() => {
    calculateLoan()
  }, [loanAmount, interestRate, loanTermYears, loanTermMonths])

  const calculateSavings = (newMonthlyPayment: number) => {
    const principal = loanAmount
    const annualRate = interestRate / 100
    const monthlyRate = annualRate / 12

    let balance = principal
    let months = 0
    let totalInterestPaid = 0

    while (balance > 0) {
      const interestPayment = balance * monthlyRate
      const principalPayment = newMonthlyPayment - interestPayment
      balance -= principalPayment
      totalInterestPaid += interestPayment
      months++
    }

    const newTotalPaid = newMonthlyPayment * months
    const savings = totalCost - newTotalPaid
    const newYears = Math.floor(months / 12)
    const newMonths = months % 12

    setAdjustedTerm({ years: newYears, months: newMonths })
    setPotentialSavings(savings)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto p-6">
      <Card className="flex-1">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Selected</h2>
          <div className="text-4xl font-bold mb-6">${monthlyRepayment.toFixed(2)} <span className="text-lg font-normal">Monthly</span></div>
          <div className="space-y-4">
            <div>
              <label htmlFor="loanAmount">Loan amount:</label>
              <div className="flex items-center">
                <input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mr-2"
                />
                {/* <InfoIcon className="text-blue-500" /> */}
              </div>
            </div>
            <div>
              <label htmlFor="interestRate">Interest rate:*</label>
              <div className="flex items-center">
                <input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  step="0.01"
                  className="mr-2"
                />
                <span>%</span>
                {/* <Button variant="link" className="text-blue-500 ml-2">View ANZ rates</Button> */}
              </div>
            </div>
            <div>
              <label htmlFor="loanLength">Loan length:*</label>
              {/* <div className="flex items-center gap-2">
                <Select value={loanTermYears.toString()} onValueChange={(value) => setLoanTermYears(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year} years</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={loanTermMonths.toString()} onValueChange={(value) => setLoanTermMonths(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                      <SelectItem key={month} value={month.toString()}>{month} months</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </div>
          <div className="mt-6 p-6 bg-blue-600 text-white rounded-lg">
            <h3 className="text-xl font-bold mb-4">Your minimum repayments:</h3>
            <div className="text-4xl font-bold mb-4">${monthlyRepayment.toFixed(2)}</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm">Loan amount:</div>
                <div className="font-bold">${loanAmount.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm">Total interest:</div>
                <div className="font-bold">${totalInterest.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm">Your total cost:</div>
                <div className="font-bold">${totalCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className="flex-1">
        <Box className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">?</div>
            <h2 className="text-2xl font-bold">Want to save money?</h2>
          </div>
          <p className="mb-4">By changing your monthly minimum repayments to:</p>
          <input
            type="number"
            value={adjustedRepayment}
            onChange={(e) => {
              setAdjustedRepayment(Number(e.target.value))
              calculateSavings(Number(e.target.value))
            }}
            className="mb-4"
          />
          <Slider
            value={[adjustedRepayment]}
            min={monthlyRepayment}
            max={monthlyRepayment * 2}
            step={10}
            onChange={(e,value) => {
              // setAdjustedRepayment(value)
              // calculateSavings(value)
            }}
            className="mb-6"
          />
          <div className="mb-6">
            <p>You could save up to <span className="font-bold">${potentialSavings.toFixed(2)}</span></p>
            <p>and adjust your loan length to <span className="font-bold">{adjustedTerm.years} years {adjustedTerm.months} months</span></p>
          </div>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Loan amount:</span>
              <span className="font-bold">${loanAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total interest:</span>
              <span className="font-bold">${(totalCost - loanAmount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total cost:</span>
              <span className="font-bold">${totalCost.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mb-2">
            {/* <PlusCircle className="mr-2" /> */}
            Add this as a scenario
          </Button>
          <Button className="w-full">
            {/* <PlusCircle className="mr-2" /> */}
            Create a new scenario
          </Button>
        </Box>
      </Card>
    </div>
  )
}

export default AdvancedHomeLoanCalculatorComponent;