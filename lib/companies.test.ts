import {Company} from "./companies";
import {fakeListingStatusForLite} from "../tests/faker";
import axios from "axios";

test('Company.all', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeListingStatusForLite)
  const companies = await Company.all()
  const type = companies.map((company) => {
    return company.assetType
  })
  expect(Array.from(new Set(type))).toBe(['Stock'])
})
