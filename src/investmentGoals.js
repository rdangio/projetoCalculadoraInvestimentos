// Essa função converte em taxa mensal, caso o usuário tenha escolhido taxa anaul
// se o ususario digitou 5% ao ano essa função transforma em 1.00407412378 ao mês
function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  // Se timeHorizon ou startingAmount for 'zero' será apresentada a mensagem de erro abaixo
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Investimento inicial e prazo devem ser preenchidos com valores positivos."
    );
  }

  // abaixo é feita uma verificação ternaria, se foi selecionado (monthly ou year) em finalReturnRate
  // se foi escolhido monthly ele divide o valor digitado por 100 e soma mais 1
  // resultando em 1.05 que é a taxa
  // se foi escolhido year ele chama a função convertToMontlyReturnRate que recebe 1+(valorDaTaxaDigitado/100)
  // ou seja se foi digitado 5 ele passa para função 1.05 que é submetido a raiz de 12(meses)
  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMontlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceInvestmentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribution;

    const interestReturns =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate;

    const investedAmount = startingAmount + monthlyContribution * timeReference;

    const totalInterestReturns = totalAmount - investedAmount;

    returnsArray.push({
      investedAmount: investedAmount,
      interestReturns: interestReturns,
      totalInterestReturns: totalInterestReturns,
      month: timeReference,
      totalAmount: totalAmount,
    });
  }
  return returnsArray;
}
