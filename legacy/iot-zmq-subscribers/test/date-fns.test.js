import tapromise from "tapromise"
import t from "tap"

import {
  yyyyMMdd,
  yyyyMMddTHHmmss,
  yyyyMMddTHHmmssZ
} from "../src/date-fns.js"

// TODO Adjust for date offset to check output of remaining functions
t.test("Check output of date functions", (t) => {
  const tp = tapromise(t)
  const dt = new Date(1999,11,30,23,59,59)
  // const localHour = 

  return Promise.all([
    tp.ok(yyyyMMdd(dt)),
    tp.ok(yyyyMMddTHHmmss),
    tp.ok(yyyyMMddTHHmmssZ),
    tp.equal(yyyyMMdd(dt), "19991231")
  ])
})

/*
t.test("", (t) => {
  const tp = tapromise(t)

  return Promise.all([
  ])
})
*/
