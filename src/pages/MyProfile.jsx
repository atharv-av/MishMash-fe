import Layout from '../wrappers/Layout'
import ProfileDetails from '../components/ProfileDetails'
import ProfileContent from '../components/ProfileContent'

const MyProfile = () => {
  return (
    <Layout>
        <ProfileDetails />
        <ProfileContent />
    </Layout>
  )
}

export default MyProfile