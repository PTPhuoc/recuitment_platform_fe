"use client";

import React from 'react'

type InputAddressProps = {
    className?: string;
    classAll?: string;
    classDisable?: string;
    classLabel?: string;
    disabled?: boolean;
    placeholder?: string;
    listSearch: {name: string; value: string}[];
    value?: string;
    lable?: string;
    outValue: (value: string) => void
}

export default function InputAddressDefault(
  {
    className,
    classAll,
    classDisable,
    classLabel,
    disabled = false,
    placeholder,
    listSearch,
    value,
    lable,
    outValue
  }: InputAddressProps
) {
  return (
    <div >
        
    </div>
  )
}
