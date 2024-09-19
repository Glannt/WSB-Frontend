import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export const SubcriptionCard = () => {
  const plans = [
    {
      name: 'Intro',
      price: 9.99,
      description: 'Perfect for individuals just starting out',
      features: [
        { name: '5GB Storage', included: true },
        { name: 'Basic Support', included: true },
        { name: '1 Integration', included: true },
        { name: 'Limited Analytics', included: true },
        { name: 'Single User', included: true },
        { name: 'Custom Domain', included: false },
        { name: 'SSL Certificate', included: false },
        { name: 'Advanced Security', included: false },
        { name: 'API Access', included: false },
        { name: 'Team Collaboration', included: false },
      ],
      color: 'bg-blue-100',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      name: 'Base',
      price: 19.99,
      description: 'Great for small businesses and growing teams',
      features: [
        { name: '20GB Storage', included: true },
        { name: 'Priority Support', included: true },
        { name: '3 Integrations', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Up to 5 Users', included: true },
        { name: 'Custom Domain', included: true },
        { name: 'SSL Certificate', included: true },
        { name: 'Advanced Security', included: false },
        { name: 'API Access', included: false },
        { name: 'Team Collaboration', included: false },
      ],
      color: 'bg-green-100',
      buttonColor: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Popular',
      price: 39.99,
      description: 'Ideal for growing businesses with advanced needs',
      features: [
        { name: '50GB Storage', included: true },
        { name: '24/7 Support', included: true },
        { name: '10 Integrations', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Up to 20 Users', included: true },
        { name: 'Custom Domain', included: true },
        { name: 'SSL Certificate', included: true },
        { name: 'Advanced Security', included: true },
        { name: 'API Access', included: true },
        { name: 'Team Collaboration', included: false },
      ],
      color: 'bg-purple-100',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      name: 'Premium',
      price: 79.99,
      description: 'For large enterprises with high-volume requirements',
      features: [
        { name: 'Unlimited Storage', included: true },
        { name: 'Premium Support', included: true },
        { name: 'Unlimited Integrations', included: true },
        { name: 'Enterprise Analytics', included: true },
        { name: 'Unlimited Users', included: true },
        { name: 'Custom Domain', included: true },
        { name: 'SSL Certificate', included: true },
        { name: 'Advanced Security', included: true },
        { name: 'API Access', included: true },
        { name: 'Team Collaboration', included: true },
      ],
      color: 'bg-orange-100',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Get an attractive price here
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Choose the perfect plan for your needs. We offer flexible options
          <br />
          to help you get the most out of our services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${plan.color} rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-4">
                  ${plan.price}
                  <span className="text-lg font-normal">/month</span>
                </p>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center mb-2">
                      {feature.included ? (
                        <FaCheck className="text-green-500 mr-2" />
                      ) : (
                        <FaTimes className="text-red-500 mr-2" />
                      )}
                      <span
                        className={
                          feature.included ? 'text-gray-800' : 'text-gray-500'
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full ${plan.buttonColor} text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300`}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
