const layout = [
  [
    {
      intlLabel: {
        id: 'Auth.form.firstname.label',
        defaultMessage: 'First name',
      },
      name: 'firstname',
      placeholder: {
        id: 'Auth.form.firstname.placeholder',
        defaultMessage: 'e.g. Kai',
      },
      type: 'text',
      size: {
        col: 6,
        xs: 12,
      },
      required: true,
    },
    {
      intlLabel: {
        id: 'Auth.form.lastname.label',
        defaultMessage: 'Last name',
      },
      name: 'lastname',
      placeholder: {
        id: 'Auth.form.lastname.placeholder',
        defaultMessage: 'e.g. Doe',
      },
      type: 'text',
      size: {
        col: 6,
        xs: 12,
      },
    },
  ],
  [
    {
      intlLabel: {
        id: 'Auth.form.email.label',
        defaultMessage: 'Email',
      },
      name: 'email',
      placeholder: {
        id: 'Auth.form.email.placeholder',
        defaultMessage: 'e.g. kai.doe@strapi.io',
      },
      type: 'email',
      size: {
        col: 6,
        xs: 12,
      },
      required: true,
    },
    {
      intlLabel: {
        id: 'Auth.form.username.label',
        defaultMessage: 'Username',
      },
      name: 'username',
      placeholder: {
        id: 'Auth.form.username.placeholder',
        defaultMessage: 'e.g. Kai_Doe',
      },
      type: 'text',
      size: {
        col: 6,
        xs: 12,
      },
    },
  ],
  [
    {
      intlLabel: {
        id: 'global.password',
        defaultMessage: 'Password',
      },
      name: 'password',
      type: 'password',
      size: {
        col: 6,
        xs: 12,
      },
      autoComplete: 'new-password',
    },
    {
      intlLabel: {
        id: 'Auth.form.confirmPassword.label',
        defaultMessage: 'Password confirmation',
      },
      name: 'confirmPassword',
      type: 'password',
      size: {
        col: 6,
        xs: 12,
      },
      autoComplete: 'new-password',
    },
  ],
  [
      {
        intlLabel: {
          id: 'Auth.form.displayname.label',
          defaultMessage: 'Display Name',
        },
        name: 'displayname',
        type: 'text',
        size: {
          col: 6,
          xs: 12,
        },
      },
    ],
    [
      {
        intlLabel: {
          id: 'Auth.form.gravatar.label',
          defaultMessage: 'Gravatar URL',
        },
        name: 'gravatar',
        type: 'text',
        size: {
          col: 6,
          xs: 12,
        },
      },
    ],
    [
      {
        intlLabel: {
          id: 'Auth.form.twitter.label',
          defaultMessage: 'Twitter URL',
        },
        name: 'twitter',
        type: 'text',
        size: {
          col: 6,
          xs: 12,
        },
      },
    ],
    [
      {
        intlLabel: {
          id: 'Auth.form.bio.label',
          defaultMessage: 'Bio',
        },
        name: 'bio',
        type: 'textarea',
        size: {
          col: 12,
          xs: 24,
        },
      },
    ],
  [
    {
      intlLabel: {
        id: 'Auth.form.active.label',
        defaultMessage: 'Active',
      },
      name: 'isActive',
      type: 'bool',
      size: {
        col: 6,
        xs: 12,
      },
    },
  ],
];

export default layout;
