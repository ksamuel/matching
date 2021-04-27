import React  from "react"

import { Disclosure } from '@headlessui/react'
import {ChevronDownIcon, DatabaseIcon} from '@heroicons/react/outline'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Accordion({name, href, current}){


    return   <Disclosure as="div" key="key" className="pt-6">

        <dt className="text-lg">

          <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
            <a  key={name} href={href}
                className={classNames(
                current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full'
                )}
            >
                <DatabaseIcon className={classNames(
                        current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6'
                      )} aria-hidden="true" />

                {name}

               <span className="ml-6 h-7 flex items-center ml-auto">
                  <ChevronDownIcon
                    className={classNames(current ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                    aria-hidden="true"
                  />
                </span>

            </a>

          </Disclosure.Button>

        </dt>

        <Disclosure.Panel as="dd" className="mt-2 pr-12">
          <p className="text-base text-gray-500">Content</p>
        </Disclosure.Panel>

  </Disclosure>


}