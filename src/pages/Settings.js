import React from 'react'
import {SettingsPane,SettingsPage,SettingsContent,SettingsMenu} from 'react-settings-pane'

export default function Settings() {
  let settings = {
    'mysettings.general.name': 'Kristen',
    'mysettings.general.email': 'kristen@kristen.kristen',
    'mysettings.profile.location-city': 'Tacoma',
    'mysettings.profile.location-state': 'WA'
  }

  const menu = [
    {
      title: 'General',
      url: '/settings/general'
    },
    {
      title: 'Profile',
      url: '/settings/profile'
    }
  ]

  const dynamicOptionsForProfilePage = [
    {
      key: 'mysettings.general.email',
      label: 'Email',
      type: 'text'
    },
    {
      key: 'mysettings.general.password',
      label: 'Password',
      type: 'password'
    }
  ]

  const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
    if (wasSaved && newSettings !== oldSettings) {
      //put request to user api
      console.log(newSettings)
    }
  }

  // const settingsChanged = () => {
  //   //triggeredonChange of the inputs
  //   console.log(settingsChanged)
  // }

    return (
        <SettingsPane items={menu} index='/settings/general' settings={settings} onPaneLeave={leavePaneHandler}>
          <SettingsMenu headline='General Settings' />
          <SettingsContent closeButtonClass='secondary' saveButtonClass='primary' header={true}>
            <SettingsPage handler='/settings/general'>
              <fieldset className='form-group'>
                <label for='profileName'>Name: </label>
                <input type='text' className='form-control' name='mysettings.general.name' placeholder='Name' id='general.name' defaultValue={settings['mysettings.general.name]']} />
              </fieldset>
              <fieldset className='form-group'>
                <label for='profileEmail'>Email: </label>
                <input type='text' className='form-control' name='mysettings.profile.email' placeholder='Email' id='profile.email' defaultValue={settings['mysettings.profile.email']} />
              </fieldset>
            </SettingsPage>
            <SettingsPage handler='/settings/profile' options={dynamicOptionsForProfilePage} />
          </SettingsContent>
        </SettingsPane>
    )
}