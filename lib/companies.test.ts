import {Company} from "./companies";
import parser from "csv-parse/lib/sync";
import {fakeListingStatusForLite} from "../tests/faker";
import axios from "axios";

test('Company.all', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(fakeListingStatusForLite)
  const companies = await Company.all()
  expect(companies[0].symbol).toBe(parser(fakeListingStatusForLite.data)[1][0])
})
