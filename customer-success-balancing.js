/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  function isAbsent(value) {
    return !customerSuccessAway.includes(value.id);
  }
  
  function orderByScoreASC(a, b) {
    if (a.score < b.score) return -1;
    if (a.score > b.score) return 1;
    return 0;
  }

  function orderByCustomerCounterDESC(a, b) {
    if (a.customerCounter < b.customerCounter) return 1;
    if (a.customerCounter > b.customerCounter) return -1;
    return 0;
  }

  function customersDistribution(CS) {
    CS.customerCounter = 0;

    customers.map((customer) => {
      if(customer.score <= CS.score) {
        CS.customerCounter += 1;
        customers = customers.filter(c => c.id !== customer.id);
      }
    })
  }

  const processedCustomerSuccess = customerSuccess.filter(isAbsent).sort(orderByScoreASC);

  processedCustomerSuccess.map((CS) => customersDistribution(CS));

  processedCustomerSuccess.sort(orderByCustomerCounterDESC);

  if(processedCustomerSuccess[0].customerCounter == processedCustomerSuccess[1].customerCounter) {
    return 0;
  }
  return processedCustomerSuccess[0].id;
}

test("Scenario 1", () => {
  css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

test("Scenario 2", () => {
  css = mapEntities([11, 21, 31, 3, 4, 5]);
  customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  css = buildSizeEntities(1000, 0);
  css[998].score = 100;
  customers = buildSizeEntities(10000, 10);
  csAway = [1000];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(999);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  css = mapEntities([1, 2, 3, 4, 5, 6]);
  customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  css = mapEntities([100, 2, 3, 3, 4, 5]);
  customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  css = mapEntities([100, 99, 88, 3, 4, 5]);
  customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  css = mapEntities([100, 99, 88, 3, 4, 5]);
  customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});
