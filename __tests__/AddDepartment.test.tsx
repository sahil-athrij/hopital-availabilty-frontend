/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { shallow } from "enzyme";
import {AddDepartmentComponent} from "../src/components/AddDepartment/AddDepartment";

describe("HandleAppState Component", () => {
    it("should render correctly by default", () => expect(shallow(<AddDepartmentComponent />)).toMatchSnapshot());
});

