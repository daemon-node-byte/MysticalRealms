import { createClient } from '@/utils/supabase/server'
import ProfileForm from './ProfileForm'
export default async function Account() {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return <ProfileForm user={user} />
  }