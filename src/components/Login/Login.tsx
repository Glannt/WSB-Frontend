import React from 'react';
import * as Form from '@radix-ui/react-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import './Login.css';
import { Em, Heading, Kbd, Link, Strong, Text } from '@radix-ui/themes';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

const Login = () => {
  return (
    <>
      <div className="flex justify-end">
        {/* <div className="img">
          <image>
            <img
              src="https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg"
              alt="logo"
              className="Logo"
            />
          </image> */}
        {/* </div> */}
        <div className="Container">
          <image>
            <AspectRatio.Root ratio={1000 / 666}>
              <img
                className="Image"
                src="https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg"
                alt="Landscape photograph by Tobias Tullius"
              />
            </AspectRatio.Root>
          </image>
        </div>
        <div>
          <div className="Login">Login</div>
          <div className="">
            <Form.Root className="FormRoot">
              <Form.Field className="FormField" name="phone">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">Phone Number</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your phone number
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid phone number
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="text" required />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="pass">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">Password</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your password
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid password
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="password" required />
                </Form.Control>
              </Form.Field>

              {/* <Form.Field className="FormField" name="email">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">Email</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your email
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid email
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="email" required />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="name">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">Full Name</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your full name
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid name
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="text" required />
                </Form.Control>
              </Form.Field>

              

              <Form.Field className="FormField" name="confirm">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">
                    Confirm Password
                  </Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your confirm password
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid confirm password
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="password" required />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="dob">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">Date Of Birth</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your date of birth
                  </Form.Message>
                  <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid date of birth
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input className="Input" type="date" required />
                </Form.Control>
              </Form.Field> */}
              {/* 
              <form>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox.Root className="CheckboxRoot" id="c1">
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label className="Label" htmlFor="c1">
                    Agree to Our terms and Conditions{' '}
                  </label>
                </div>
              </form> */}
              {/* <Form.Field className="FormField" name="question">
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <Form.Label className="FormLabel">Question</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a question
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea className="Textarea" required />
            </Form.Control>
          </Form.Field> */}
              <Link className="Link" href="#">
                Forgot Password?
              </Link>
              <button className="Button" style={{ marginTop: 10 }}>
                Login
              </button>
              <Link
                href="#"
                className="Button Google"
                style={{ marginTop: 10 }}
              >
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="google"
                  className="Google"
                />
                Login with Google
              </Link>
              <div className="vanh">
                New User?ㅤ
                <Link href="#">
                  <Strong>Register</Strong>
                </Link>
              </div>
            </Form.Root>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
