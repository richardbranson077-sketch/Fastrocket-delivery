'use client';

import { createContext, useContext, ReactNode } from 'react';
import { IntlProvider } from 'use-intl';

type I18nProviderProps = {
    locale: string;
    messages: Record<string, any>;
    children: ReactNode;
};

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
}
