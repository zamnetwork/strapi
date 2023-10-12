import * as React from 'react';

import { useAppInfo, useRBACProvider, useStrapiApp, hasPermissions } from '@strapi/helper-plugin';
import { Cog, Puzzle, ShoppingCart } from '@strapi/icons';
import cloneDeep from 'lodash/cloneDeep';
import { useSelector } from 'react-redux';

import { selectAdminPermissions } from '../../App/selectors';

/**
 * This function resolves an array of Promises<boolean>
 * It puts at a specific index the status of a specific permission.
 * While this might look weird, we then iterate on this array
 * and check the different CT/ST/general/plugin sections
 * and make an index based comparisons
 */
const checkPermissions = (userPermissions, permissionsToCheck) =>
  permissionsToCheck.map(({ permissions }) => hasPermissions(userPermissions, permissions));

const getGeneralLinks = async (userPermissions, generalSectionRawLinks, shouldUpdateStrapi) => {
  const generalSectionPermissionsPromises = checkPermissions(
    userPermissions,
    generalSectionRawLinks
  );
  const generalSectionLinksPermissions = await Promise.all(generalSectionPermissionsPromises);

  const authorizedGeneralSectionLinks = generalSectionRawLinks.filter(
    (_, index) => generalSectionLinksPermissions[index]
  );

  const settingsLinkIndex = authorizedGeneralSectionLinks.findIndex(
    (obj) => obj.to === '/settings'
  );

  if (settingsLinkIndex === -1) {
    return [];
  }

  const authorizedGeneralLinksClone = cloneDeep(authorizedGeneralSectionLinks);

  authorizedGeneralLinksClone[settingsLinkIndex].notificationsCount = shouldUpdateStrapi ? 1 : 0;

  return authorizedGeneralLinksClone;
};

const getPluginSectionLinks = async (userPermissions, pluginsSectionRawLinks) => {
  const pluginSectionPermissionsPromises = checkPermissions(
    userPermissions,
    pluginsSectionRawLinks
  );
  const pluginSectionLinksPermissions = await Promise.all(pluginSectionPermissionsPromises);

  const authorizedPluginSectionLinks = pluginsSectionRawLinks.filter(
    (_, index) => pluginSectionLinksPermissions[index]
  );

  return authorizedPluginSectionLinks;
};

export const useMenu = () => {
  const { allPermissions: userPermissions } = useRBACProvider();
  const { shouldUpdateStrapi } = useAppInfo();
  const { menu } = useStrapiApp();
  const permissions = useSelector(selectAdminPermissions);
  const [menuWithUserPermissions, setMenuWithUserPermissions] = React.useState({
    generalSectionLinks: [
      {
        icon: Puzzle,
        intlLabel: {
          id: 'global.plugins',
          defaultMessage: 'Plugins',
        },
        to: '/list-plugins',
        permissions: permissions.marketplace.main,
      },
      {
        icon: ShoppingCart,
        intlLabel: {
          id: 'global.marketplace',
          defaultMessage: 'Marketplace',
        },
        to: '/marketplace',
        permissions: permissions.marketplace.main,
      },
      {
        icon: Cog,
        intlLabel: {
          id: 'global.settings',
          defaultMessage: 'Settings',
        },
        to: '/settings',
        // Permissions of this link are retrieved in the init phase
        // using the settings menu
        permissions: [],
        notificationsCount: 0,
      },
    ],
    pluginsSectionLinks: [],
    isLoading: true,
  });
  const generalSectionLinksRef = React.useRef(menuWithUserPermissions.generalSectionLinks);

  React.useEffect(() => {
    async function applyMenuPermissions() {
      const authorizedPluginSectionLinks = await getPluginSectionLinks(userPermissions, menu);

      const authorizedGeneralSectionLinks = await getGeneralLinks(
        userPermissions,
        generalSectionLinksRef.current,
        shouldUpdateStrapi
      );

      setMenuWithUserPermissions((state) => ({
        ...state,
        generalSectionLinks: authorizedGeneralSectionLinks,
        pluginsSectionLinks: authorizedPluginSectionLinks,
        isLoading: false,
      }));
    }

    applyMenuPermissions();
  }, [
    setMenuWithUserPermissions,
    generalSectionLinksRef,
    userPermissions,
    menu,
    permissions,
    shouldUpdateStrapi,
  ]);

  return menuWithUserPermissions;
};
